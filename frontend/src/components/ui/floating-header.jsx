import React from "react";
import { Grid2x2PlusIcon, MenuIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetFooter } from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FloatingHeader({ isAuthenticated, user, onLogout }) {
  const [open, setOpen] = React.useState(false);

  const links = isAuthenticated
    ? [
        { label: "Dashboard", href: "/" },
        { label: "Projects", href: "/projects" },
        { label: "Tasks", href: "/tasks" }
      ]
    : [
        { label: "Login", href: "/login" },
        { label: "Signup", href: "/signup" }
      ];

  return (
    <header
      className={cn(
        "floating-nav sticky top-4 z-50",
        "mx-auto w-full max-w-5xl rounded-xl border shadow",
        "backdrop-blur-lg"
      )}
    >
      <nav className="mx-auto flex items-center justify-between p-1.5">
        <Link to={isAuthenticated ? "/" : "/login"} className="brand-mark hover:bg-accent flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 duration-100">
          <Grid2x2PlusIcon className="size-5" />
          <p className="font-mono text-base font-bold">TaskForge</p>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link key={link.label} className={buttonVariants({ variant: "ghost", size: "sm" })} to={link.href}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <span className="user-chip">{user?.name}</span>
              <Button size="sm" variant="outline" onClick={onLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button size="sm">Login</Button>
            </Link>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <Button size="icon" variant="outline" onClick={() => setOpen(!open)} className="lg:hidden">
              <MenuIcon className="size-4" />
            </Button>
            <SheetContent
              className="gap-0 bg-white/95 backdrop-blur-lg"
              showClose={false}
              side="left"
            >
              <div className="grid gap-y-2 overflow-y-auto px-4 pb-5 pt-12">
                {links.map((link) => (
                  <Link
                    key={link.label}
                    className={buttonVariants({
                      variant: "ghost",
                      className: "justify-start"
                    })}
                    to={link.href}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <SheetFooter>
                {isAuthenticated ? (
                  <Button
                    variant="outline"
                    onClick={() => {
                      onLogout();
                      setOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                ) : (
                  <Link to="/signup" onClick={() => setOpen(false)}>
                    <Button>Get Started</Button>
                  </Link>
                )}
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
