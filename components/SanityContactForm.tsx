import ContactForm from "./ContactForm";
import { SanityContactFormPropsType } from "@/types/types";

export default function SanityContactForm({
  value,
  locale,
}: SanityContactFormPropsType) {
  return (
    <ContactForm
      title={value.title}
      subtitle={value.subtitle}
      emailRecipient={value.emailRecipient}
      successMessage={value.successMessage}
      nameFieldLabel={value.nameFieldLabel}
      emailFieldLabel={value.emailFieldLabel}
      messageFieldLabel={value.messageFieldLabel}
      submitButtonText={value.submitButtonText}
      locale={locale}
    />
  );
}
