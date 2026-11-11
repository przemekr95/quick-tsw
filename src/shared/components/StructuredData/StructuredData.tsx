import type { JsonLd } from '../../utils/structuredData';

interface StructuredDataProps {
  data: JsonLd | JsonLd[];
}

export function StructuredData({ data }: StructuredDataProps) {
  // Text from the API ends up inside a <script>, so "<" is escaped to keep a
  // value like "</script>" from closing it.
  const json = JSON.stringify(data).replaceAll('<', '\\u003c');

  return <script dangerouslySetInnerHTML={{ __html: json }} type="application/ld+json" />;
}
