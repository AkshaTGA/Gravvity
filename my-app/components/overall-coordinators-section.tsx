"use client"

import { useMembers } from "@/hooks/use-members"
import dynamic from 'next/dynamic'
import "./ProfileCard.css"
import ShinyText from './BlurText';

const ProfileCard = dynamic(() => import('./profile-card'), {
  ssr: false,
  loading: () => <div className="w-full h-[480px] rounded-2xl bg-card/50 animate-pulse" />
});
export function OverallCoordinatorsSection() {
  const members = useMembers()
  const overallCoordinators = members.filter((member) => member.isOverallCoordinator)

  if (overallCoordinators.length === 0) {
    return null
  }
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text text-center">Leadership</h2>
        <p className="text-foreground/60 mb-16 text-lg text-center">Meet our overall coordinators and advisors</p>

        <div className="flex flex-wrap gap-8 justify-center">
          {overallCoordinators.map((member, index) => (
            <div key={member.id}>
              <ProfileCard
                name={member.name}
                title={member.bio || member.wing}
                handle={member.name?.toLowerCase().replace(/\s+/g, '') || 'member'}
                status={member.role}
                contactText="Contact"
                avatarUrl={member.image || '/placeholder-avatar.svg'}
                socials={{
                  linkedin: member.socials?.linkedin,
                  instagram: member.socials?.instagram,
                  x: member.socials?.twitter,
                }}
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => console.log('Contact', member.name)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
