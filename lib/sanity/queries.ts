export const JOURNEY_QUERY = `
  *[_type == "journeyEvent"] | order(order asc) {
    "id": id.current,
    year,
    title,
    subtitle,
    description
  }
`;

export const PROJECTS_QUERY = `
  *[_type == "project"] | order(order asc) {
    "id": _id,
    title,
    description,
    "image": image.asset->url,
    techStack,
    isOpenSource,
    githubUrl,
    liveUrl
  }
`;

export const CERTIFICATES_QUERY = `
  *[_type == "certificate"] | order(order asc) {
    "id": _id,
    title,
    issuer,
    credentialId,
    "image": image.asset->url,
    redirectUrl,
    category
  }
`;

export const ABOUT_QUERY = `
  *[_type == "about"][0] {
    "journey": journey[] {
      "id": _key,
      text,
      done
    },
    "socials": socials[] {
      "id": _key,
      label,
      href
    },
    "stats": stats[] {
      "id": _key,
      value,
      unit,
      sub
    }
  }
`;
