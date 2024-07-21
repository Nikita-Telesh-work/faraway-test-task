import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/shared/tests';

import { Skeleton } from './Skeleton';

describe('Component: Skeleton', () => {
  it.each`
    itemToRender         | isLoading
    ${`'Skeleton'`}      | ${true}
    ${'passed children'} | ${false}
  `(`renders $itemToRender if prop 'isLoading' === $isLoading`, ({ isLoading }) => {
    renderWithProviders(
      <Skeleton isLoading={isLoading}>
        <div data-testid="passedChildren" />
      </Skeleton>,
    );

    const skeletonComponent = screen.queryByTestId('skeleton');
    const childrenComponent = screen.getByTestId('passedChildren');

    if (isLoading) {
      expect(skeletonComponent).toBeVisible();
      expect(childrenComponent).not.toBeVisible();
    } else {
      expect(childrenComponent).toBeVisible();
      expect(skeletonComponent).not.toBeInTheDocument();
    }
  });
});
