import { LoadingScreen } from '../../shared/components/LoadingScreen';
import { ThemeProvider } from '../providers/ThemeProvider';

export default function HomeRoute() {
  return (
    <ThemeProvider theme="mezczyzni">
      <LoadingScreen />
    </ThemeProvider>
  );
}
