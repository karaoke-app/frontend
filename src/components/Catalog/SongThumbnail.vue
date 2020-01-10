<template>
  <router-link :to="songLink" class="thumbnail-container">
    <div class="thumbnail">
      <img src="http://placehold.jp/500x350.png" />
    </div>
    <div class="thumbnail-title">{{ song.artist }} - {{ song.title }}</div>
  </router-link>
</template>

<script>
export default {
  name: "SongThumbnail",
  props: {
    song: { type: Object, required: true }
  },
  computed: {
    songLink: function() {
      return {
        name: "song",
        params: {
          songId: this.song.id
        }
      };
    }
  }
};
</script>

<style scoped lang="scss">
.thumbnail-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .thumbnail {
    margin: 1em;
    position: relative;
    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);

    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        141deg,
        #3725d4 0%,
        #7957d5 71%,
        #9b67df 100%
      );
      transform: rotate(4deg);
      z-index: -1;
      transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    }
  }

  &:hover .thumbnail {
    transform: scale(1.02);

    &::before {
      transform: rotate(7deg);
    }
  }

  .thumbnail-title {
    text-align: center;
    font-weight: bold;
  }
}
</style>
