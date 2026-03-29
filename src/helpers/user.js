export const canTargetWithJesseJones = ({ turn, user }) => {
  if (!turn || !user || !user.character) return false;
  return !turn.isStarted && turn.userId === user.id && user.character.name === 'jesse_jones'
}