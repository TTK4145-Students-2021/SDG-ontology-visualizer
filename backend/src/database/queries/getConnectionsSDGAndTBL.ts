import {
  mapIdToOntologyEntity,
  parseOntologyEntityToQuery,
  parsePrefixesToQuery,
} from '../../common/database';
import { PREFIXES } from '../index';

export default (nodeId: string): string => {
  const node = mapIdToOntologyEntity(nodeId);
  if (!node) return '';

  const fullNodeName = parseOntologyEntityToQuery(node);
  const prefixString = parsePrefixesToQuery(node.prefix, PREFIXES.RDFS);

  return `
    ${prefixString}
    SELECT *
    WHERE {
      {
        ${fullNodeName} SDG:harBidragTilBærekraftsmål ?Object .
        OPTIONAL {?Object rdfs:label ?ObjectLabel}
      }
      UNION
      {
        ${fullNodeName} SDG:harBidragTilTrippelBunnlinje ?Object.
        OPTIONAL {?Object rdfs:label ?ObjectLabel}
      }
    }`;
};
