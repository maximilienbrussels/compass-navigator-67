import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@tanstack/react-start", async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  useServerFn: () => () => Promise.resolve({}),
}));
vi.mock("sonner", () => ({ toast: Object.assign(vi.fn(), { info: vi.fn(), success: vi.fn(), error: vi.fn() }) }));

import { ProfileView } from "./ProfileView";
import type { ProfileRecord } from "@/lib/profile";

const base: ProfileRecord = {
  id: "00000000-0000-4000-8000-000000000001",
  username: "jona",
  display_name: "Jona",
  tagline: null,
  avatar_url: null,
  theme: "noir",
  card_style: "bordered",
  blocks: [],
};

function renderProfile(profile: ProfileRecord, preview = false) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false, enabled: false } } });
  return render(
    <QueryClientProvider client={client}>
      <ProfileView profile={profile} preview={preview} />
    </QueryClientProvider>,
  );
}

afterEach(cleanup);

describe("profile tiles, countdown and preview", () => {
  it("keeps the classic single column when no block has a tile size", () => {
    const { container } = renderProfile({ ...base, blocks: [{ id: "a", kind: "link", label: "Site", value: "https://a.be" }] });
    expect(container.querySelector("[data-tile]")).toBeNull();
  });

  it("switches to a two-column tile grid once a block has a size", () => {
    const { container } = renderProfile({
      ...base,
      blocks: [
        { id: "a", kind: "link", label: "Site", value: "https://a.be", size: "small" },
        { id: "b", kind: "link", label: "Shop", value: "https://b.be", size: "small" },
        { id: "c", kind: "link", label: "Blog", value: "https://c.be" },
      ],
    });
    const tiles = [...container.querySelectorAll("[data-tile]")];
    expect(tiles.map((t) => t.getAttribute("data-tile"))).toEqual(["small", "small", "row"]);
    expect(tiles[0]?.className).toContain("col-span-1");
    expect(tiles[2]?.className).toContain("col-span-2");
  });

  it("renders a countdown block with a timer", () => {
    renderProfile({ ...base, blocks: [{ id: "c", kind: "countdown", label: "Lancering", value: "2099-01-01T00:00:00.000Z" }] });
    expect(screen.getByRole("timer")).toBeTruthy();
    expect(screen.getByText("Lancering")).toBeTruthy();
  });

  it("does not navigate away when a link is clicked in the Studio preview", () => {
    renderProfile({ ...base, blocks: [{ id: "a", kind: "link", label: "Site", value: "https://a.be" }] }, true);
    const link = screen.getByText("Site").closest("a");
    expect(link).toBeTruthy();
    const event = new MouseEvent("click", { bubbles: true, cancelable: true });
    fireEvent(link as HTMLAnchorElement, event);
    expect(event.defaultPrevented).toBe(true);
  });
});
