// DOM Elements
const tabs = document.querySelector('.tabs');
const tabButtons = tabs.querySelectorAll('button');
const tabPanels = Array.from(tabs.querySelectorAll('[aria-labelledby]'));

// Event handler
function handleBtnClick(e) {
  // console.log(e.currentTarget);
  // hides all tab panels
  tabPanels.forEach(panel => (panel.hidden = true));
  // unselect all the tab buttons
  tabButtons.forEach(button => button.setAttribute('aria-selected', false));
  // highlight the selected tab button
  e.currentTarget.setAttribute('aria-selected', true);

  const { id } = e.currentTarget;

  // FIND THE TAB PANEL WHOSE ARIA-LABELLEDBY MATCHES WITH ID
  const tabPanel = tabPanels.find(
    panel => panel.getAttribute('aria-labelledby') == id
  );
  tabPanel.hidden = false;
}

// Loop over the tab buttons
tabButtons.forEach(button => {
  button.addEventListener('click', handleBtnClick);
});
