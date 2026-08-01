<?php
/**
 * Plugin Name: Ink Editor
 * Plugin URI: https://inkforgejs.com
 * Description: ForgeStack Ink rich text editor for WordPress — classic meta box MVP that enqueues the built Ink bundle.
 * Version: 1.0.0
 * Author: John Yaghobieh
 * License: MIT
 * Text Domain: ink-editor
 */

if (!defined('ABSPATH')) {
  exit;
}

define('INK_EDITOR_VERSION', '1.0.0');
define('INK_EDITOR_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('INK_EDITOR_PLUGIN_URL', plugin_dir_url(__FILE__));

function ink_editor_enqueue_assets($hook) {
  if ($hook !== 'post.php' && $hook !== 'post-new.php') {
    return;
  }

  $js = INK_EDITOR_PLUGIN_DIR . 'assets/ink-editor.js';
  $css = INK_EDITOR_PLUGIN_DIR . 'assets/ink-editor.css';

  if (file_exists($css)) {
    wp_enqueue_style(
      'ink-editor',
      INK_EDITOR_PLUGIN_URL . 'assets/ink-editor.css',
      array(),
      INK_EDITOR_VERSION
    );
  }

  if (file_exists($js)) {
    wp_enqueue_script(
      'ink-editor',
      INK_EDITOR_PLUGIN_URL . 'assets/ink-editor.js',
      array(),
      INK_EDITOR_VERSION,
      true
    );
  }
}
add_action('admin_enqueue_scripts', 'ink_editor_enqueue_assets');

function ink_editor_add_meta_box() {
  add_meta_box(
    'ink_editor_meta',
    __('Ink Editor', 'ink-editor'),
    'ink_editor_render_meta_box',
    array('post', 'page'),
    'normal',
    'high'
  );
}
add_action('add_meta_boxes', 'ink_editor_add_meta_box');

function ink_editor_render_meta_box($post) {
  wp_nonce_field('ink_editor_save', 'ink_editor_nonce');
  $value = get_post_meta($post->ID, '_ink_editor_html', true);
  ?>
  <div id="ink-editor-root"
       data-ink-value="<?php echo esc_attr($value); ?>"
       style="min-height:220px;border:1px solid #d0d5dd;border-radius:8px;padding:12px;background:#fff;">
    <p style="color:#667085;margin:0 0 8px;">
      <?php esc_html_e('Ink WordPress stub (1.0.0): paste HTML below or replace assets/ with the published Ink UMD/IIFE build.', 'ink-editor'); ?>
    </p>
    <textarea name="ink_editor_html" rows="10" style="width:100%;font-family:ui-monospace,monospace;"><?php echo esc_textarea($value); ?></textarea>
  </div>
  <?php
}

function ink_editor_save_meta_box($post_id) {
  if (!isset($_POST['ink_editor_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['ink_editor_nonce'])), 'ink_editor_save')) {
    return;
  }
  if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
    return;
  }
  if (!current_user_can('edit_post', $post_id)) {
    return;
  }
  if (!isset($_POST['ink_editor_html'])) {
    return;
  }
  $html = wp_kses_post(wp_unslash($_POST['ink_editor_html']));
  update_post_meta($post_id, '_ink_editor_html', $html);
}
add_action('save_post', 'ink_editor_save_meta_box');
