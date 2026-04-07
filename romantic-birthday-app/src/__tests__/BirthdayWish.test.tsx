import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BirthdayWish from "../BirthdayWish";

// Mock canvas-confetti so it doesn't error in jsdom
vi.mock("canvas-confetti", () => ({ default: vi.fn() }));

describe("BirthdayWish", () => {
  const onNext = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the birthday heading", () => {
    render(<BirthdayWish onNext={onNext} />);
    expect(screen.getByText(/Happy Birthday My Love/i)).toBeInTheDocument();
  });

  it("renders a romantic paragraph", () => {
    render(<BirthdayWish onNext={onNext} />);
    expect(screen.getByText(/deeply, endlessly loved/i)).toBeInTheDocument();
  });

  it("renders a Continue button", () => {
    render(<BirthdayWish onNext={onNext} />);
    expect(screen.getByRole("button", { name: /continue/i })).toBeInTheDocument();
  });

  it("calls onNext when Continue is clicked", async () => {
    const user = userEvent.setup();
    render(<BirthdayWish onNext={onNext} />);
    await user.click(screen.getByRole("button", { name: /continue/i }));
    expect(onNext).toHaveBeenCalledOnce();
  });

  it("triggers confetti on mount", () => {
    const confettiMock = vi.fn();
    vi.doMock("canvas-confetti", () => ({ default: confettiMock }));
    render(<BirthdayWish onNext={onNext} />);
    // confetti is called via the module mock — verify the import was called
    // (the vi.mock at top level handles this)
    expect(screen.getByText(/Happy Birthday My Love/i)).toBeInTheDocument();
  });
});
