export type SkillResolverArgs = string

const resolveSkillId = (id: SkillResolverArgs) => {
  return id
}

const resolveSkillName = () => {
  // TODO: get name from network skills list
  return null
}

// TODO: is this correct?
const resolveSkillParent = (
  id: SkillResolverArgs,
) => {
  // Root skill will not have parents
  if (id === '1') {
    return null
  }

  // Non-root must currently have root parent
  return '1'
}

export default {
  id: resolveSkillId,
  name: resolveSkillName,
  parent: resolveSkillParent,
}
