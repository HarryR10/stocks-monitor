var count = 0;

export default function (name) {
    return "O-" + (name == null ? "" : name + "-") + ++count;
}
