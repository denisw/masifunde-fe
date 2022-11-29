import * as pages from '../routes/pages'
import { jpegQuality } from '../utils/constants'
import { fetchSingleEntry } from './contentfulService'
import {
  unwrapFields,
  unwrapImage,
  unwrapPageUrl,
  unwrapPortrait,
  unwrapStat,
  unwrapTeamMember,
  unwrapProjects,
  unwrapStats,
} from './common'

export async function fetchWhatWeDoPage(locale) {
  const content = await fetchSingleEntry('pageWasWirMachen', locale)

  function createProject(project) {
    return {
      ...project.fields,
      image: unwrapImage(project && project.fields && project.fields.image),
    }
  }

  const countries = {
    southAfrica: {
      buttonLink: pages.approachSA,
      title: content && content.projectsTitleSa,
      description: content && content.projectsDescriptionSa,
      projects: content && content.projectsSa.map(createProject),
      button: content && content.projectsButtonSa,
    },
    germany: {
      buttonLink: pages.approachDE,
      title: content && content.projectsTitleDe,
      description: content && content.projectsDescriptionDe,
      projects: content && content.projectsDe.map(createProject),
      button: content && content.projectsButtonDe,
    },
  }

  return {
    ...content,
    countries,
    stats: content && content.stats.map(unwrapFields),
    bannerButtonUrl: unwrapPageUrl(content.bannerButtonUrl),
  }
}

export async function fetchApproachDePage(locale) {
  const content = (await fetchSingleEntry('pageApproachDE', locale)) || {}
  const { teamMember, image1, projects, bannerButtonUrl } = content

  return {
    ...content,
    teamMember: unwrapTeamMember(teamMember),
    image1: unwrapImage(image1, { q: jpegQuality }),
    projects: unwrapProjects(projects),
    bannerButtonUrl: unwrapPageUrl(bannerButtonUrl),
    stats: unwrapStats(content.stats),
  }
}

export async function fetchImpactPage(locale) {
  const content = await fetchSingleEntry('pageImpact', locale)
  return {
    ...content,
    stats1: content && (content.stats1 || []).map(unwrapStat),
    stats2: content && (content.stats2 || []).map(unwrapStat),
    portrait1: unwrapPortrait(content && content.portrait1),
    portrait2: unwrapPortrait(content && content.portrait2),
    bannerButtonUrl: unwrapPageUrl(content.bannerButtonUrl),
  }
}

export async function fetchApproachSaPage(locale) {
  const content = await fetchSingleEntry('pageApproachSA', locale)
  return {
    ...content,
    projects: unwrapProjects(content.projects),
    bannerButtonUrl: unwrapPageUrl(content.bannerButtonUrl),
  }
}
