function getTitle(vm) {
  const { title } = vm.$options;
  if (title) {
    return typeof title === "function" ? title.call(vm) : title;
  }
}

function update(self) {
  const title = getTitle(self);
  if (title) {
    document.title = title + " | karaoke-app";
  }
}

export default {
  updated() {
    update(this);
  },
  created() {
    update(this);
  }
};
