import { NotFoundInfo } from '../../../features/not-found/NotFoundInfo';
import { MEN_SECTION_PATH } from '../../../shared/utils/config';

export default function MezczyzniNotFoundRoute() {
  return <NotFoundInfo homePath={`${MEN_SECTION_PATH}/klub`} />;
}
