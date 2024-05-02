interface H1Props {
  children: JSX.Element | string;
}

function H1({ children }: H1Props): JSX.Element {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl whitespace-pre-line">
      {children}
    </h1>
  );
}

export const Typography = {
  H1,
};
