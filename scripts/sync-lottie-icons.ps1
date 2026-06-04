# Descarga los JSON de LottieFiles y colócalos en public/lottie/icons/
# En cada enlace: "Download" -> "Lottie JSON" -> guardar con el nombre indicado.

$icons = @{
  "wardrobe.json"      = "https://lottiefiles.com/free-animation/capsue-wordrobe-carousel-ezNGiNgRXo"
  "shopping-bag.json"  = "https://lottiefiles.com/free-animation/shopping-bag-tezYFkLlEe"
  "shopping-cart.json" = "https://lottiefiles.com/free-animation/shopping-cart-lINKzONxSk"
  "qr-scan.json"       = "https://lottiefiles.com/free-animation/qr-code-scanning-ldQNhPORcx"
  "card.json"          = "https://lottiefiles.com/free-animation/card-tarjeta-wUKgQC4dAa"
  "fist-bump.json"     = "https://lottiefiles.com/free-animation/fist-bump-79hI3NROvn"
}

$dest = Join-Path $PSScriptRoot "..\public\lottie\icons"
New-Item -ItemType Directory -Force -Path $dest | Out-Null

Write-Host "Coloca cada archivo en: $dest"
Write-Host "IMPORTANTE: el nombre debe terminar en .json (no .json.json)`n"
foreach ($entry in $icons.GetEnumerator()) {
  Write-Host "  $($entry.Key) <- $($entry.Value)"
}

Write-Host "`nAbriendo enlaces en el navegador..."
foreach ($url in $icons.Values) {
  Start-Process $url
}
