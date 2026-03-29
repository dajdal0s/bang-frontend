export function sortRoomUsers(users, userId) {
  const myIndex = users.findIndex(user => user.id === userId)

  if (myIndex < 0) return users;

  for (let i = 0; i < myIndex; i++) {
    const firstUser = users[0]
    users.splice(0, 1)
    users.push(firstUser)
  }

  return users
}

export function getLastRoomTurn(room) {
  const { turns } = room
  if (!turns.length) return null
  return turns[turns.length - 1]
}