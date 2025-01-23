import { Block, BlockData, CheckListItem, ListItem } from "@/interface";

const Content = (block: Block) => {
  const { type, data } = block;

  if (type === "paragraph") {
    return <p dangerouslySetInnerHTML={{ __html: data.text || "" }}></p>;
  }

  if (type === "header") {
    if (data.level === 1) {
      return <h1 dangerouslySetInnerHTML={{ __html: data.text || "" }}></h1>;
    }
    if (data.level === 2) {
      return <h2 dangerouslySetInnerHTML={{ __html: data.text || "" }}></h2>;
    }
    if (data.level === 3) {
      return <h3 dangerouslySetInnerHTML={{ __html: data.text || "" }}></h3>;
    }
    if (data.level === 4) {
      return <h4 dangerouslySetInnerHTML={{ __html: data.text || "" }}></h4>;
    }
  }

  if (type === "list") {
    return (
      <List style={data.style || ""} items={data.items || ([] as ListItem[])} />
    );
  }

  if (type === "checkList") {
    return (
      <CheckList
        items={
          data.items?.filter(
            (item): item is CheckListItem => "checked" in item
          ) || []
        }
      />
    );
  }

  if (type === "quote") {
    return <Quote {...data} />;
  }

  return null;
};

const CheckList = ({ items }: { items: CheckListItem[] }) => {
  return (
    <ul className="list-inside">
      {items.map((item) => (
        <li key={item.text}>
          <input
            type="checkbox"
            defaultChecked={item.checked}
            className="mr-2"
          />
          {item.text}
        </li>
      ))}
    </ul>
  );
};

const List = ({
  style,
  items,
}: {
  style: string;
  items: (ListItem | CheckListItem)[];
}) => {
  return (
    <ul
      className={`${
        style === "ordered" ? "list-decimal" : "list-disc"
      } list-inside`}
    >
      {items.map((item) => (
        <li key={"content" in item ? item.content : item.text}>
          {"content" in item ? item.content : item.text}
        </li>
      ))}
    </ul>
  );
};

const Quote = ({ text, caption }: BlockData) => {
  return (
    <div className="border-l-4 text-white border-primary pl-4 bg-neutral-950 p-4">
      <p>{text}</p>
      <p className="text-sm text-primary mt-2">{caption}</p>
    </div>
  );
};

export default Content;
