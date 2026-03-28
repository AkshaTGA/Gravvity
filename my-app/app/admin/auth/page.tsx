"use client";

import { useEffect, useRef } from "react";
import { AdminLoginForm } from "@/components/login-form";
import { Navigation } from "@/components/navigation";
import { useAdminStore } from "@/hooks/use-admin-store";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const { isLoggedIn, checkAuth, authChecked } = useAdminStore();
  const router = useRouter();
  const redirectedRef = useRef(false);

  // Redirect only after auth status is known and not previously redirected.
  useEffect(() => {
    if (authChecked && isLoggedIn && !redirectedRef.current) {
      redirectedRef.current = true;
      router.replace("/admin/dashboard");
    }
  }, [authChecked, isLoggedIn, router]);

  if (!authChecked) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-foreground/60">Checking authentication…</p>
      </main>
    );
  }

  if (isLoggedIn) {
    // Render a minimal placeholder while redirecting
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-foreground/60">Redirecting…</p>
      </main>
    );
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen mt-10 bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="card-glow p-8 space-y-6">
            <div className="text-center">
              <h1 className="md:text-3xl text-2xl font-bold gradient-text mb-2 gap-2 flex items-center justify-center">
                <img
                  src="/GRAVITY_Cover_No_BG(1).png"
                  alt="Gravity"
                  className="md:h-10 h-8 w-auto object-contain drop-shadow-[0_0_8px_rgba(124,92,255,0.35)]"
                />
                <span>Admin</span>
              </h1>
              <p className="text-foreground/60">Manage members and content</p>
            </div>
            <AdminLoginForm />
          </div>
        </div>
      </main>
    </>
  );
}
