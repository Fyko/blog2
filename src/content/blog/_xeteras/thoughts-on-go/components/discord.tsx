import {
  DiscordMessageContainer,
  DiscordMessage,
  DiscordMessageText,
} from "🧱/messaging/Discord";

export const RobPike = ({ robPike, clap, downvote }) => {
  return (
    <DiscordMessageContainer>
      <DiscordMessage
        messages={[
          <DiscordMessageText>
            The key point here is our programmers are Googlers, they’re not
            researchers.
          </DiscordMessageText>,
          <DiscordMessageText>
            They’re typically, fairly young, fresh out of school, probably
            learned Java, maybe learned C or C++, probably learned Python.
          </DiscordMessageText>,
          <DiscordMessageText>
            They’re not capable of understanding a brilliant language but we
            want to use them to build good software. So, the language that we
            give them has to be easy for them to understand and easy to adopt.
          </DiscordMessageText>,
        ]}
        date="May 19, 2014"
        username="Rob Pike"
        roleColor="text-cyan-500"
        avatar={robPike}
        reactions={[
          {
            image: clap,
            reactCount: 1024,
            name: ":clap:",
          },
          {
            image: downvote,
            reactCount: 1,
            reacted: true,
            name: ":thumbs_down:",
          },
        ]}
      />
    </DiscordMessageContainer>
  );
};
