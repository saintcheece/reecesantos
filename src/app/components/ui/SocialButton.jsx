/** Square orange icon link. `icon` is a component from Icons.jsx. */
export default function SocialButton({ href, label, icon: Icon }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="grid size-18 place-items-center bg-primary text-dark transition-transform duration-100 ease-out hover:scale-110"
    >
      <Icon className="h-auto w-12" />
    </a>
  );
}
