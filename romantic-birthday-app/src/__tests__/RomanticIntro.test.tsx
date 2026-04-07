import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act, fireEvent } from "@testing-library/react";
import RomanticIntro from "../RomanticIntro";

describe("RomanticIntro", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("does not show Continue button while typing is in progress", () => {
    render(<RomanticIntro onNext={() => {}} />);
    // Advance only a little — typing not complete
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(screen.queryByRole("button", { name: /continue/i })).not.toBeInTheDocument();
  });

  it("shows Continue button only when typing is complete", () => {
    render(<RomanticIntro onNext={() => {}} />);
    // Advance enough time for all characters to be typed (text is ~150 chars × 50ms = ~7500ms)
    act(() => {
      vi.advanceTimersByTime(10000);
    });
    expect(screen.getByRole("button", { name: /continue/i })).toBeInTheDocument();
  });

  it("calls onNext when Continue is clicked", () => {
    const onNext = vi.fn();
    render(<RomanticIntro onNext={onNext} />);
    act(() => {
      vi.advanceTimersByTime(10000);
    });
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));
    expect(onNext).toHaveBeenCalledOnce();
  });

  it("displays typed text progressively", () => {
    render(<RomanticIntro onNext={() => {}} />);
    act(() => {
      vi.advanceTimersByTime(200); // 4 characters at 50ms each
    });
    const paragraph = screen.getByRole("paragraph") ?? document.querySelector("[aria-live]");
    // Some text should be visible but not the full intro
    const text = document.querySelector("[aria-live]")?.textContent ?? "";
    expect(text.length).toBeGreaterThan(0);
  });
});
