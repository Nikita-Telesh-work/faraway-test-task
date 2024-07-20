import { Skeleton as MuiSkeleton, SkeletonProps } from '@mui/material';
import React from 'react';

interface ISkeleton extends SkeletonProps {
  isLoading: boolean;
}

export const Skeleton: React.FC<ISkeleton> = (props) => {
  const { isLoading, children, sx, ...skeletonProps } = props;

  if (isLoading) {
    return (
      <MuiSkeleton
        sx={{
          ...sx,
          transform: 'none',
        }}
        {...skeletonProps}>
        {children}
      </MuiSkeleton>
    );
  }

  return children;
};
