import { withBasePath } from '../../utils/assetPath';

export default function MediaFrame({ src, alt = '', className = '', imageClassName = '', children }) {
  return (
    <div className={`overflow-hidden rounded-4xl shadow-feature ${className}`}>
      {src ? (
        <img src={withBasePath(src)} alt={alt} className={`h-full w-full object-cover ${imageClassName}`} loading="lazy" />
      ) : (
        children
      )}
    </div>
  );
}
