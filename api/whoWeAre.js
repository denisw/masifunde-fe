import { fetchSingleEntry } from './contentfulService'
import { unwrapImage, unwrapPartner, unwrapRegionalGroups, unwrapTeamMembers } from './common'

export async function fetchWhoWeArePage(locale) {
  const response = await fetchSingleEntry('about', locale)

  return {
    ...response,
    teamDeImage: unwrapImage(response && response.teamDeImage),
    teamSaImage: unwrapImage(response && response.teamSaImage),
    partnersListOne: response && response.partnersListOne.map(unwrapPartner),
    partnersListTwo: response && response.partnersListTwo.map(unwrapPartner),
  }
}

export async function fetchTeamDePage(locale) {
  const content = await fetchSingleEntry('pageTeamDe', locale)

  return {
    ...content,
    teamMembers: unwrapTeamMembers(content && content.teamMembers),
    regionalGroups: unwrapRegionalGroups(content && content.regionalGroups),
  }
}

export async function fetchTeamSaPage(locale) {
  const content = await fetchSingleEntry('pageTeamSa', locale)

  return {
    ...content,
    introImage: unwrapImage(content && content.introImage),
    teamMembers: unwrapTeamMembers(content && content.teamMembers),
  }
}
