const logger = {
  info: (title: string, ...msg: string[]) =>
    console.info(
      `[INFO] %c${title}\n`,
      "color: #00defa; font-weight: 900",
      [...msg].map((m) => `\n\t:${m}`)
    ),
  warn: (title: string, ...msg: string[]) => {
    console.warn(
      `[WARN] %c${title}\n`,
      "color: #9ebc00; font-weight: 900",
      ...msg
    );
    console.trace();
  },
  error: (title: string, ...msg: string[]) => {
    console.error(
      `[ERROR] %c${title}\n`,
      "color: #ff0000; font-weight: 900",
      ...msg
    );
    console.trace();
  },
  debug: (title: string, ...msg: string[]) => {
    console.debug(
      `[DEBUG] %c${title}\n`,
      "color: #ff00ff; font-weight: 900",
      ...msg
    );
    console.trace();
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logValue: (label: string, value: any) => {
    if (typeof value === "object") {
      const obj = Object.entries(value);
      const formattedObj = obj.map(([key, val]) => `\t%c${key}: %c${val}`);
      console.log(
        `[LOG] %c${label}:\n`,
        formattedObj.join("\n"),
        "color: #00defa; font-weight: 900;",
        "color:rgb(0, 157, 255); font-weight: 400;",
        "color: #ffffff; font-weight: 900;"
      );
    } else {
      console.log(
        `[LOG] %c${label}: %c${value}`,
        "color: #00defa; font-weight: 900",
        "color: #ffffff; font-weight: 400"
      );
    }
  }
};

export default logger;
