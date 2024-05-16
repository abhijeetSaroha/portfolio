import React, { useState } from "react";
import styled from "styled-components";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  @media (max-width: 960px) {
    padding: 0px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0px 0px 80px 0px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 24px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid
    ${({ theme }) => (theme.error ? "red" : theme.text_secondary)};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid
    ${({ theme }) => (theme.error ? "red" : theme.text_secondary)};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  background: linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  background: -moz-linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  background: -webkit-linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;

  &:active {
    background: hsla(294, 100%, 30%, 1);
  }
`;

const Contact = () => {
  //hooks
  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState({
    email: "",
    name: "",
    subject: "",
    message: "",
  });
  const form = useRef();

  const validateEmail = (email) => {
    const re =
      // eslint-disable-next-line no-useless-escape
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = form.current.from_email.value;
    const name = form.current.from_name.value;
    const subject = form.current.subject.value;
    const message = form.current.message.value;

    let errorObj = {};
    if (!email || !validateEmail(email)) {
      errorObj.email = "Please enter a valid email address";
    }
    if (!name) {
      errorObj.name = "Please enter your name";
    }
    if (!subject) {
      errorObj.subject = "Please enter the subject";
    }
    if (!message) {
      errorObj.message = "Please enter your message";
    }

    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: "Abhijeet Saroha",
      subject: subject,
      message: message,
    };

    if (Object.keys(errorObj).length > 0) {
      setError(errorObj);
    } else {
      setError({});
      emailjs
        .send(
          "service_aynfin6",
          "template_kl1z73s",
          templateParams,
          "b6ysbeawEV_pwc4CW"
        )
        .then((result) => {
          setOpen(true);
          form.current.reset();
          alert("Email Sent!");
        })
        .catch((error) => {
          console.error("Email sending failed:", error);
          alert("Failed to send email. Please try again later.");
        });
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Contact</Title>
        <Desc>
          Feel free to reach out to me for any questions or opportunities!
        </Desc>
        <ContactForm ref={form} onSubmit={handleSubmit}>
          <ContactTitle>Email Me 🚀</ContactTitle>
          <ContactInput
            placeholder="Your Email"
            name="from_email"
            error={error.email}
          />
          {error.email && <span style={{ color: "red" }}>{error.email}</span>}
          <ContactInput
            placeholder="Your Name"
            name="from_name"
            error={error.name}
          />
          {error.name && <span style={{ color: "red" }}>{error.name}</span>}
          <ContactInput
            placeholder="Subject"
            name="subject"
            error={error.subject}
          />
          {error.subject && (
            <span style={{ color: "red" }}>{error.subject}</span>
          )}
          <ContactInputMessage
            placeholder="Message"
            rows="4"
            name="message"
            error={error.message}
          />
          {error.message && (
            <span style={{ color: "red" }}>{error.message}</span>
          )}
          <ContactButton type="submit" value="Send" />
        </ContactForm>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
        >
          <Alert severity="success" onClose={() => setOpen(false)}>
            Email sent successfully!
          </Alert>
        </Snackbar>
      </Wrapper>
    </Container>
  );
};

export default Contact;
