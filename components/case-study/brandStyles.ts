interface CaseStudyBrandStyles {
  subheadText: string;
  subheadDivider: string;
}

const defaultStyles: CaseStudyBrandStyles = {
  subheadText: 'text-content-subtle',
  subheadDivider: 'bg-gradient-to-b from-electric/30 via-electric/10 to-transparent',
};

const coralStyles: CaseStudyBrandStyles = {
  subheadText: 'bg-gradient-to-r from-[#F36A59] to-[#FFB3A8] bg-clip-text text-transparent',
  subheadDivider: 'bg-gradient-to-b from-[#F36A59]/35 via-[#F36A59]/12 to-transparent',
};

const ticvisionStyles: CaseStudyBrandStyles = {
  subheadText: 'bg-gradient-to-r from-[#DFEBEE] to-[#589CB4] bg-clip-text text-transparent',
  subheadDivider: 'bg-gradient-to-b from-[#589CB4]/35 via-[#589CB4]/12 to-transparent',
};

const studbudStyles: CaseStudyBrandStyles = {
  subheadText: 'bg-gradient-to-r from-[#8FA98F] to-[#C3D3C3] bg-clip-text text-transparent',
  subheadDivider: 'bg-gradient-to-b from-[#8FA98F]/35 via-[#8FA98F]/12 to-transparent',
};

export const getCaseStudyBrandStyles = (pathname?: string | null): CaseStudyBrandStyles => {
  if (!pathname) return defaultStyles;
  if (pathname.includes('/work/coralehr')) return coralStyles;
  if (pathname.includes('/work/ticvision')) return ticvisionStyles;
  if (pathname.includes('/work/studbud')) return studbudStyles;
  return defaultStyles;
};
