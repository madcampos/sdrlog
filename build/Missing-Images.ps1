Get-ChildItem '../public/data/' -Directory |
Where-Object { $_.Name -ne '$schemas' } |
ForEach-Object {
	$IndexFile = Get-Content "$(Join-Path $_ -ChildPath 'index.json')" | ConvertFrom-Json

	if (-not (Test-Path "$(Join-Path $_ -ChildPath $IndexFile.cover)" -PathType 'Leaf')) {
		$_
	}
}
