/**
 * Standard WordPress Post Statuses
 */
export type WPPostStatus = 'publish' | 'future' | 'draft' | 'pending' | 'private' | 'trash' | 'inherit' | 'auto-draft';

/**
 * Standard WordPress Post Types
 */
export type WPPostType = 'post' | 'page' | 'attachment' | 'revision' | 'nav_menu_item' | 'custom_css' | 'customize_changeset' | string;

export interface IWPPost {
  ID: number;
  post_author: number;
  post_date: string;          // Format: YYYY-MM-DD HH:MM:SS
  post_date_gmt: string;
  post_content: string;
  post_title: string;
  post_excerpt: string;
  post_status: WPPostStatus;
  comment_status: 'open' | 'closed';
  ping_status: 'open' | 'closed';
  post_password: string;
  post_name: string;          // The slug
  to_ping: string;
  pinged: string;
  post_modified: string;
  post_modified_gmt: string;
  post_content_filtered: string;
  post_parent: number;
  guid: string;
  menu_order: number;
  post_type: WPPostType;
  post_mime_type: string;
  comment_count: number;
}