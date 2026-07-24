import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '../../providers/ThemeProvider';
import { SectionLayout } from '../../../shared/components/SectionLayout';

export default function KobietyLayoutRoute() {
  return (
    <ThemeProvider theme="kobiety">
      <SectionLayout sectionLabel="Kobiety" sectionPath="/kobiety">
        <Outlet />
      </SectionLayout>
    </ThemeProvider>
  );
}
