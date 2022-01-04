import { DetailedHTMLProps, FC, useCallback, useMemo } from "react";

interface Message {
  createdDate: Date;
  text: string;
  id: number;
}

interface SortMessagesProps {
  messages: Message[];
}

const SortMessages: FC<SortMessagesProps> = ({ messages }) => {
  const sortMessages = useCallback((msgs: Message[]) => {
    return msgs.sort((a: Message, b: Message) => {
      return a.createdDate.valueOf() - b.createdDate.valueOf();
    });
  }, []);

  const sortedMessages = useMemo(
    (): Message[] => sortMessages(messages),
    [messages, sortMessages]
  );

  const messageDisplay = useMemo(
    (): DetailedHTMLProps<
      React.LiHTMLAttributes<HTMLLIElement>,
      HTMLLIElement
    >[] =>
      sortedMessages.map(
        (
          m: Message
        ): DetailedHTMLProps<
          React.LiHTMLAttributes<HTMLLIElement>,
          HTMLLIElement
        > => <li key={m.id}>{m.text}</li>
      ),
    [sortedMessages]
  );

  return <div>{messageDisplay}</div>;
};

export default SortMessages;
