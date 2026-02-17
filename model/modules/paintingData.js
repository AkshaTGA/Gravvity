const FRONT_WALL_MAX = 4;
const SIDE_WALL_MAX = 4;
const MEMBERS_MAX = SIDE_WALL_MAX * 2;
const WALL_SPAN_MIN = -10;
const WALL_SPAN_MAX = 10;

const FALLBACK_ARTWORK_COUNT = 16;

function fallbackArtwork(index) {
  return `artworks/${(index % FALLBACK_ARTWORK_COUNT) + 1}.jpg`;
}

function toPaintingInfo(member, index) {
  const name = typeof member?.name === "string" && member.name.trim()
    ? member.name.trim()
    : `Metaverse Member ${index + 1}`;

  const role = typeof member?.role === "string" && member.role.trim()
    ? member.role.trim()
    : "member";

  const wing = typeof member?.wing === "string" && member.wing.trim()
    ? member.wing.trim()
    : "Metaverse";

  const bio = typeof member?.bio === "string" && member.bio.trim()
    ? member.bio.trim()
    : "";

  const image = typeof member?.image === "string" && member.image.trim()
    ? member.image.trim()
    : fallbackArtwork(index);

  return {
    imgSrc: image,
    width: 4,
    height: 4,
    info: {
      title: name,
      artist: role,
      description: bio,
      year: wing,
      socials: {
        linkedin: member?.socials?.linkedin || "",
        github: member?.socials?.github || "",
        twitter: member?.socials?.twitter || "",
        instagram: member?.socials?.instagram || "",
      },
      link:
        member?.socials?.linkedin ||
        member?.socials?.github ||
        member?.socials?.twitter ||
        member?.socials?.instagram ||
        "",
    },
  };
}

function getEvenlySpacedValues(count, min, max) {
  if (count <= 0) {
    return [];
  }

  if (count === 1) {
    return [(min + max) / 2];
  }

  const step = (max - min) / (count - 1);
  return Array.from({ length: count }, (_, index) => min + step * index);
}

function createFrontWallSlots(count) {
  return getEvenlySpacedValues(count, WALL_SPAN_MIN, WALL_SPAN_MAX).map((x) => ({
    position: { x, y: 3, z: -19.5 },
    rotationY: 0,
  }));
}

function createLeftWallSlots(count) {
  return getEvenlySpacedValues(count, WALL_SPAN_MIN, WALL_SPAN_MAX).map((z) => ({
    position: { x: -19.5, y: 3, z },
    rotationY: Math.PI / 2,
  }));
}

function createRightWallSlots(count) {
  return getEvenlySpacedValues(count, WALL_SPAN_MIN, WALL_SPAN_MAX).map((z) => ({
    position: { x: 19.5, y: 3, z },
    rotationY: -Math.PI / 2,
  }));
}

function mapMembersToSlots(members, slots, startIndex) {
  return members.map((member, index) => {
    const slot = slots[index];
    return {
      ...toPaintingInfo(member, startIndex + index),
      position: slot.position,
      rotationY: slot.rotationY,
    };
  });
}

export async function getPaintingData() {
  try {
    const response = await fetch("/api/public/members", {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    const allMembers = await response.json();
    if (!Array.isArray(allMembers)) {
      return [];
    }

    const metaverseMembers = allMembers.filter((member) => {
      if (!member || typeof member !== "object") {
        return false;
      }

      const wing = typeof member.wing === "string" ? member.wing : "";
      return wing.trim().toLowerCase() === "metaverse";
    });

    const coordinators = metaverseMembers.filter((member) => {
      const role = typeof member?.role === "string" ? member.role : "";
      return role.trim().toLowerCase() === "coordinator";
    });

    const regularMembers = metaverseMembers.filter((member) => {
      const role = typeof member?.role === "string" ? member.role : "";
      return role.trim().toLowerCase() !== "coordinator";
    });

    const frontMembers = coordinators.slice(0, FRONT_WALL_MAX);
    const frontSlots = createFrontWallSlots(frontMembers.length);
    const frontPaintings = mapMembersToSlots(frontMembers, frontSlots, 0);

    const cappedMembers = regularMembers.slice(0, MEMBERS_MAX);
    const leftCount = Math.ceil(cappedMembers.length / 2);
    const rightCount = cappedMembers.length - leftCount;

    const leftMembers = cappedMembers.slice(0, leftCount);
    const rightMembers = cappedMembers.slice(leftCount);

    const leftSlots = createLeftWallSlots(Math.min(leftMembers.length, SIDE_WALL_MAX));
    const rightSlots = createRightWallSlots(Math.min(rightMembers.length, SIDE_WALL_MAX));

    const leftPaintings = mapMembersToSlots(
      leftMembers.slice(0, SIDE_WALL_MAX),
      leftSlots,
      frontPaintings.length
    );
    const rightPaintings = mapMembersToSlots(
      rightMembers.slice(0, SIDE_WALL_MAX),
      rightSlots,
      frontPaintings.length + leftPaintings.length
    );

    return [...frontPaintings, ...leftPaintings, ...rightPaintings];
  } catch (error) {
    console.error("Failed to fetch metaverse members for gallery", error);
    return [];
  }
}
