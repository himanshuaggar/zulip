// Mark this as a module for ESLint and Webpack.
export {};

function get_new_rand(old_random_int, max) {
    const random_int = Math.floor(Math.random() * max);
    return random_int === old_random_int ? get_new_rand(random_int, max) : random_int;
}

function get_random_item_from_array(array) {
    return array[Math.floor(Math.random() * array.length)];
}

const current_client_logo_class_names = new Set([
    "client-logos__logo_akamai",
    "client-logos__logo_tum",
    "client-logos__logo_wikimedia",
    "client-logos__logo_rust",
    "client-logos__logo_dr_on_demand",
    "client-logos__logo_maria",
]);
const future_client_logo_class_names = new Set([
    "client-logos__logo_pilot",
    "client-logos__logo_recurse",
    "client-logos__logo_level_up",

    "client-logos__logo_layershift",
    "client-logos__logo_julia",
    "client-logos__logo_ucsd",
    "client-logos__logo_lean",
    "client-logos__logo_asciidoc",
]);
let current_client_logo_class_names_index = 0;
function update_client_logo() {
    if (document.hidden) {
        return;
    }
    const client_logos = [...document.querySelectorAll("[class^='client-logos__']")];
    current_client_logo_class_names_index = get_new_rand(
        current_client_logo_class_names_index,
        client_logos.length,
    );
    const client_logo_elt = client_logos[current_client_logo_class_names_index];

    const current_logo_class = client_logo_elt.className;
    current_client_logo_class_names.delete(current_logo_class);

    const next_logo_class = get_random_item_from_array([
        ...future_client_logo_class_names.values(),
    ]);
    future_client_logo_class_names.delete(next_logo_class);
    client_logo_elt.className = next_logo_class;
    current_client_logo_class_names.add(next_logo_class);
    future_client_logo_class_names.add(current_logo_class);
}

setInterval(update_client_logo, 2500);
