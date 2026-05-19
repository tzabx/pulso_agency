export default function Footer({ footer }) {
  return (
    <footer className="bg-[#111D1D] py-8">
      <div className="mx-auto flex max-w-shell flex-wrap justify-between gap-4 px-8 text-[0.7rem] tracking-[0.05rem] text-white/30">
        <span>{footer.left}</span>
        <span>{footer.right}</span>
      </div>
    </footer>
  );
}
