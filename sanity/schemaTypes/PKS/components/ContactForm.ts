import { defineType, defineField } from "sanity";

export default defineType({
  name: "contactForm",
  title: "Contact Form",
  type: "object",
  groups: [
    { name: "content", title: "Content" },
    { name: "labels", title: "Form Labels" },
    { name: "settings", title: "Settings" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      description: "Title for the contact form section",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      group: "content",
      description: "Subtitle or description text for the contact form",
    }),
    defineField({
      name: "emailRecipient",
      title: "Email Recipient",
      type: "string",
      group: "settings",
      description: "Email address where form submissions will be sent",
    }),
    defineField({
      name: "successMessage",
      title: "Success Message",
      type: "string",
      group: "settings",
      description: "Message to display after successful form submission",
      initialValue: "Thank you for your message. We'll get back to you soon!",
    }),
    defineField({
      name: "nameFieldLabel",
      title: "Name Field Label",
      type: "string",
      group: "labels",
      initialValue: "Your Name",
    }),
    defineField({
      name: "emailFieldLabel",
      title: "Email Field Label",
      type: "string",
      group: "labels",
      initialValue: "Your Email",
    }),
    defineField({
      name: "messageFieldLabel",
      title: "Message Field Label",
      type: "string",
      group: "labels",
      initialValue: "Your Message",
    }),
    defineField({
      name: "submitButtonText",
      title: "Submit Button Text",
      type: "string",
      group: "labels",
      initialValue: "Send Message",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Contact Form",
        subtitle: subtitle,
      };
    },
  },
});