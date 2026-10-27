import { useRef } from "react";
import { contact, socials } from "../../data/site";
import Section from "../layout/Section";
import SectionTitle from "../layout/SectionTitle";
import Button from "../ui/Button";
import SocialButton from "../ui/SocialButton";
import { ArrowIcon } from "../icons/Icons";

function shake(el) {
  el.animate(
    [
      { transform: "translateX(0)" },
      { transform: "translateX(-8px)" },
      { transform: "translateX(8px)" },
      { transform: "translateX(-6px)" },
      { transform: "translateX(6px)" },
      { transform: "translateX(0)" },
    ],
    { duration: 500, easing: "ease-in-out" },
  );
}

export default function Contact() {
  const textareaRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const textarea = textareaRef.current;
    const message = textarea.value;

    if (message.trim().length === 0) {
      shake(textarea);
      textarea.focus();
      return;
    }

    const url =
      "https://mail.google.com/mail/?view=cm&fs=1" +
      `&to=${encodeURIComponent(contact.email)}` +
      `&su=${encodeURIComponent(contact.subject)}` +
      `&body=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener");
  };

  // grow with the content
  const autoGrow = (event) => {
    const el = event.currentTarget;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  return (
    <Section id="contact">
      <SectionTitle href="#contact">contacts</SectionTitle>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          ref={textareaRef}
          aria-label="Your message"
          placeholder="Say 'Hi' here!"
          rows={2}
          onInput={autoGrow}
          className="w-full resize-none rounded-none border-b-4 border-l-4 border-primary bg-dark p-2 text-2xl text-light placeholder:text-light/60 focus:outline-none"
        />
        <div className="flex justify-end">
          <Button type="submit" icon={ArrowIcon}>
            send as email
          </Button>
        </div>
      </form>

      <ul className="flex flex-wrap gap-4">
        {socials.map((social) => (
          <li key={social.label}>
            <SocialButton {...social} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
