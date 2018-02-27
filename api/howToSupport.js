/* eslint-disable import/prefer-default-export */
import { fetchMemoizedSingleEntry, fetchSingleEntry } from './contentfulService'
import {
  unwrapFields,
  unwrapImage,
  unwrapPageUrl,
  unwrapPartners,
  unwrapTeamMember,
  unwrapTestimonials,
} from './common'
import { jpegQuality } from '../utils/constants'

export async function fetchDonatePage(locale) {
  const content = await fetchMemoizedSingleEntry('pageDonate', locale)
  return {
    ...content,
    section2ReferenceList: content.section2ReferenceList.map(unwrapFields),
    section3ReferenceList: content.section3ReferenceList.map(unwrapFields),
    bannerButtonUrl: unwrapPageUrl(content.bannerButtonUrl),
  }
}

const unwrapSectionImage = image => unwrapImage(image, {
  w: 495,
  q: jpegQuality,
})

export async function fetchHowToSupportPage(locale) {
  const content = await fetchMemoizedSingleEntry('pageWieSieHelfen', locale)
  return {
    ...content,
    section1Image: unwrapSectionImage(content.section1Image),
    section2Image: unwrapSectionImage(content.section2Image),
    section3Image: unwrapSectionImage(content.section3Image),
    section4Image: unwrapSectionImage(content.section4Image),
  }
}

const unwrapVolunteerOpening = volunteerOpening => ({
  ...volunteerOpening.fields,
})

export async function fetchBecomeAVolunteerPage(locale) {
  const content = (await fetchMemoizedSingleEntry('pageAktivWerden', locale)) || {}
  return {
    ...content,
    section1TeamMember: unwrapTeamMember(content && content.section1TeamMember),
    volunteerOpenings: content && content.volunteerOpenings.map(unwrapVolunteerOpening),
    bannerButtonUrl: unwrapPageUrl(content.bannerButtonUrl),
    section1ReferenceList: unwrapTestimonials(content.section1ReferenceList),
    section5ReferenceList: unwrapTestimonials(content.section5ReferenceList),
    section6TeamMember: unwrapTeamMember(content.section6TeamMember),
  }
}

export async function fetchBecomeAPartnerPage(locale) {
  const content = await fetchSingleEntry('pageBecomeAPartner', locale)
  return {
    ...content,
    partners: unwrapPartners(content.partners),
    teamMember: unwrapTeamMember(content.teamMember),
    bannerButtonUrl: unwrapPageUrl(content.bannerButtonUrl),
  }
}

export async function fetchBecomeASponsorPage(locale) {
  const content = await fetchMemoizedSingleEntry('pagePateWerden', locale)
  return {
    ...content,
    image: unwrapImage(content && content.image),
    section2ReferenceList: content && content.section2ReferenceList.map(unwrapFields),
    section3ReferenceList: content && content.section3ReferenceList.map(unwrapFields),
    bannerButtonUrl: unwrapPageUrl(content.bannerButtonUrl),
  }
}
