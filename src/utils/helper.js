export function mapResult(result) {
  let res = {
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
    fifth: 0,
    sixth: 0,
  };

  const keys = ["first", "second", "third", "fourth", "fifth", "sixth"];

  for (const item of result) {
    let [win, times] = item.split(" ").map((res) => res.trim());
    if (win === "true") {
      const index = Number(times) - 1;
      if (index >= 0 && index < keys.length) {
        res[keys[index]]++;
      }
    }
  }

  return res;
}
