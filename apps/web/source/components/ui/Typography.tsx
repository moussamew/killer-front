interface Props {
  children: JSX.Element | string;
}

function H1({ children }: Props) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl whitespace-pre-line">
      {children}
    </h1>
  );
}

function Blockquote({ children }: Props) {
  return (
    <blockquote className="border-l-4 pl-4 italic border-zinc-400 text-slate-500">
      {children}
    </blockquote>
  );
}

export const Typography = {
  H1,
  Blockquote,
};
