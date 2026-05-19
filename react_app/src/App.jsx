import site from '../../shared/data/site.json';
import home from '../../shared/data/home.json';
import BaseLayout from './layouts/BaseLayout';
import Footer from './components/shared/Footer';
import Navbar from './components/shared/Navbar';
import SectionRenderer from './components/shared/SectionRenderer';
import AdminPanel from './components/admin/AdminPanel';
import { EditProvider } from './editor/state/EditProvider';
import { useEditor } from './editor/hooks/useEditor';

function AppContent() {
  const {
    state: { draft },
  } = useEditor();

  return (
    <BaseLayout meta={draft.home.meta} site={draft.site.site}>
      <Navbar branding={draft.site.branding} navigation={draft.site.navigation} />
      <main>
        {draft.home.sections.map((section) => (
          <SectionRenderer key={section.id ?? section.type} section={section} />
        ))}
      </main>
      <Footer footer={draft.site.footer} />
      <AdminPanel />
    </BaseLayout>
  );
}

export default function App() {
  return (
    <EditProvider
      source={{
        site,
        home,
      }}
    >
      <AppContent />
    </EditProvider>
  );
}
