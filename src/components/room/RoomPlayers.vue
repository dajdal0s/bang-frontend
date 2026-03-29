<template>
  <div>
    <UserBoard v-for="(user, index) in sortedUsers"
      :userData="user"
      :key="user.id"
      :index="index" />
    <RoomButtons />
  </div>
</template>

<script>
import { sortRoomUsers } from "../../helpers/room";

import UserBoard from "../user/UserBoard";
import RoomButtons from "../buttons/RoomButtons";

export default {
  components: { UserBoard, RoomButtons },
  props: {
    users: Array,
    me: Object
  },
  computed: {
    sortedUsers() {
      const activeUsers = this.users.filter(u => !u.isSpectating)
      return sortRoomUsers(activeUsers, this.me.id)
    }
  }
}
</script>
