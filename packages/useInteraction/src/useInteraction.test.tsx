import { fireEvent, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React from "react";
import { useInteraction } from "./useInteraction";

type Props = {
  skip?: boolean;
  withButton?: boolean;
  onInteraction: (event: Event) => void;
  label: string;
};

const Example = (props: Props) => {
  const [ref, state] = useInteraction({
    skip: props.skip,
    onInteraction:
      props.onInteraction !== undefined ? props.onInteraction : undefined,
  });

  return (
    <>
      <div
        ref={ref}
        style={{
          width: 200,
          height: 50,
          padding: 20,
          fontWeight: 600,
          borderRadius: 4,
          background: props.skip ? "lightgrey" : "aquamarine",
        }}
        tabIndex={0}
        role="button"
      >
        {props.withButton ? (
          <button type="button">{props.label}</button>
        ) : (
          props.label
        )}
      </div>
      <code style={{ whiteSpace: "pre" }}>
        <pre data-testid="output">{JSON.stringify(state, null, 2)}</pre>
      </code>
    </>
  );
};

it("should handle hovering", async () => {
  const cb = vi.fn();
  render(<Example label="Interaction box" onInteraction={cb} />);
  const button = screen.getByRole("button");
  await userEvent.hover(button);

  expect(cb).toHaveBeenLastCalledWith(
    expect.any(Event),
    expect.objectContaining({
      hover: true,
    }),
  );

  await userEvent.unhover(button);

  expect(cb).toHaveBeenLastCalledWith(
    expect.any(Event),
    expect.objectContaining({
      hover: false,
    }),
  );
});

it.skip("should handle focus", () => {
  const cb = vi.fn();
  render(<Example label="Interaction box" onInteraction={cb} />);
  const button = screen.getByRole("button");

  fireEvent.focus(button);

  expect(cb).toHaveBeenLastCalledWith(
    expect.any(Event),
    expect.objectContaining({
      focus: true,
      focusWithin: false,
    }),
  );

  fireEvent.focusIn(button);
  expect(cb).toHaveBeenLastCalledWith(
    expect.any(Event),
    expect.objectContaining({
      focus: true,
      focusWithin: true,
    }),
  );

  fireEvent.focusOut(button);
  expect(cb).toHaveBeenLastCalledWith(
    expect.any(Event),
    expect.objectContaining({
      focus: true,
      focusWithin: false,
    }),
  );

  fireEvent.blur(button);
  expect(cb).toHaveBeenLastCalledWith(
    expect.any(Event),
    expect.objectContaining({
      focus: false,
      focusWithin: false,
    }),
  );
});

it("should handle active", () => {
  const cb = vi.fn();
  render(<Example label="Interaction box" onInteraction={cb} />);
  const button = screen.getByRole("button");

  fireEvent.mouseDown(button);
  expect(cb).toHaveBeenLastCalledWith(
    expect.any(Event),
    expect.objectContaining({
      active: true,
    }),
  );

  fireEvent.mouseUp(button);
  expect(cb).toHaveBeenLastCalledWith(
    expect.any(Event),
    expect.objectContaining({
      active: false,
    }),
  );

  fireEvent.touchStart(button);
  expect(cb).toHaveBeenLastCalledWith(
    expect.any(Event),
    expect.objectContaining({
      active: true,
    }),
  );

  fireEvent.touchEnd(button);
  expect(cb).toHaveBeenLastCalledWith(
    expect.any(Event),
    expect.objectContaining({
      active: false,
    }),
  );
});

it("should skip events", async () => {
  const cb = vi.fn();
  render(<Example label="Interaction box" onInteraction={cb} skip />);
  const button = screen.getByRole("button");

  await userEvent.hover(button);
  expect(cb).not.toHaveBeenCalled();
});
