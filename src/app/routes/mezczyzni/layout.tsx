import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '../../providers/ThemeProvider';
import { SectionLayout } from '../../../shared/components/SectionLayout';

export default function MezczyzniLayoutRoute() {
  return (
    <ThemeProvider theme="mezczyzni">
      <SectionLayout sectionLabel="Mężczyźni" sectionPath="/mezczyzni">
        <Outlet />
      </SectionLayout>
    </ThemeProvider>
  );
}
