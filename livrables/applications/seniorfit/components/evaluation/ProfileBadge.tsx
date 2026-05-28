import type { Profile } from '@/lib/types';
import { PROFILE_LABELS } from '@/lib/types';

interface Props {
  profile: Profile;
  size?: 'sm' | 'lg';
  showLabel?: boolean;
}

export function ProfileBadge({ profile, size = 'sm', showLabel = true }: Props) {
  const big = size === 'lg';
  return (
    <span
      className={`pbadge pbadge-${profile.toLowerCase()}`}
      style={big ? { fontSize: 14, padding: '5px 14px' } : undefined}>
      {profile}{showLabel ? ` ${PROFILE_LABELS[profile]}` : ''}
    </span>
  );
}
