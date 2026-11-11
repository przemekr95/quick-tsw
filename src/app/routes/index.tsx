import { SplitScreen } from '../../shared/components/SplitScreen';
import { usePageMeta } from '../../shared/hooks';
import { PAGE_META } from '../../shared/utils/pageMeta';

export default function HomeRoute() {
  usePageMeta(PAGE_META.home);

  return <SplitScreen />;
}
