import { useNavigate } from 'react-router-dom';

export function useNavigation() {
  const navigateTo = useNavigate();

  const navigate = (path: string): void => {
    if (document.startViewTransition) {
      document.startViewTransition(() => navigateTo(path));
    } else {
      navigateTo(path);
    }
  };

  return { navigate };
}
