if (-not $args[0]) {
	Write-Error 'Please inform a file or folder'
	exit 1
}

if (-not (Test-Path $args[0])) {
	Write-Error 'Please inform a valid path'
	exit 1
}

if (-not (Get-Command gm.exe -ErrorAction SilentlyContinue)) {
	Write-Error 'Graphics Magick unavailable'
	exit 1
}

if (-not (Get-Command pngquant.exe -ErrorAction SilentlyContinue)) {
	Write-Error 'pngquant unavailable'
	exit 1
}

$file = Get-Item $args[0]

function convertImgs($img) {
	# Ref: http://www.graphicsmagick.org/GraphicsMagick.html
	$command = 'convert'
	$commonParams = '-strip -minify -interlace Line -sampling-factor 4:2:0 -colorspace RGB'
	$thumbParam = '-geometry x256'
	$fullParam = '-geometry x1024'

	$formats = @(
		@{
			ext = '.jpg';
			name = 'JPEG';
			params = '-quality 73 -define jpeg:dct-method=float'
		},
		@{
			ext = '.jxr';
			name = 'JPEG-XR';
			params = '-quality 63 -define jpeg:dct-method=float'
		},
		@{
			ext = '.webp';
			name = 'WEBP';
			params = '-quality 63 -define webp:lossless=false -define webp:image-hint=picture -define webp:auto-filter=true -define webp:method=6'
		},
		@{
			ext = '.jp2';
			name = 'JPEG 2000';
			params = '-quality 55 -define jpeg:dct-method=float'
		},
		@{
			ext = '.png';
			name = 'PNG';
			params = '-quality 60 -depth 8 -treedepth 6 -dither -define png:compression-filter=8 -define png:compression-level=9 -define png:compression-strategy=3'
		}
	)

	$thumbsDir = Join-Path $img.DirectoryName 'thumbs'
	$optDir = Join-Path $img.DirectoryName 'optimized'

	if (-not (Test-Path $thumbsDir)) {
		New-Item $thumbsDir -ItemType Directory > $null
	}

	if (-not (Test-Path $optDir)) {
		New-Item $optDir -ItemType Directory > $null
	}

	Write-Progress -Activity "Converting: $($img.Name)" -ParentId 1 -PercentComplete 0 -CurrentOperation 'Creating images'
	$j = 0
	foreach ($format in $formats) {
		Write-Progress -Activity "Converting: $($img.Name)" -Status "$([Math]::Floor(($j / $formats.Count) * 100))% Complete" -ParentId 1 -PercentComplete (($j / $formats.Count) * 100) -CurrentOperation "Creating $($format.name)"
		$j++

		if ($format.ext -eq '.png') {
			# Generate pngs from optimized jpegs
			Start-Process gm.exe -Wait -NoNewWindow -ArgumentList "$command $commonParams $($format.params) $fullParam `"$(Join-Path $optDir $img.BaseName).jpg`" `"$(Join-Path $optDir $img.BaseName)$($format.ext)`""

			Start-Process gm.exe -Wait -NoNewWindow -ArgumentList "$command $commonParams $($format.params) $thumbParam `"$(Join-Path $thumbsDir $img.BaseName).jpg`" `"$(Join-Path $thumbsDir $img.BaseName)$($format.ext)`""

			# Do color quantization in PNGS
			Start-Process pngquant.exe -Wait -NoNewWindow -ArgumentList "--skip-if-larger --speed 1 --strip --nofs --force --output `"$(Join-Path $optDir $img.BaseName)$($format.ext)`" `"$(Join-Path $optDir $img.BaseName)$($format.ext)`""

			Start-Process pngquant.exe -Wait -NoNewWindow -ArgumentList "--skip-if-larger --speed 1 --strip --nofs --force --output `"$(Join-Path $thumbsDir $img.BaseName)$($format.ext)`" `"$(Join-Path $thumbsDir $img.BaseName)$($format.ext)`""
		} else {
			Start-Process gm.exe -Wait -NoNewWindow -ArgumentList "$command $commonParams $($format.params) $fullParam `"$($img.FullName)`" `"$(Join-Path $optDir $img.BaseName)$($format.ext)`""

			Start-Process gm.exe -Wait -NoNewWindow -ArgumentList "$command $commonParams $($format.params) $thumbParam `"$($img.FullName)`" `"$(Join-Path $thumbsDir $img.BaseName)$($format.ext)`""
		}
	}
}

if ($file.Attributes -ne 'Directory') {
	Write-Progress -Activity 'Converting files' -Id 1 -PercentComplete 0 -Status '0% Complete. (File: 1/1)'
	convertImgs $file
} else {
	$i = 0
	$files = Get-ChildItem $file -File

	Write-Progress -Activity 'Converting files' -Id 1 -PercentComplete $i -Status "0% Complete. (File: 1/$($files.Count))"
	foreach ($file in $files) {
		$i++
		Write-Progress -Activity 'Converting files' -Status "$([Math]::Floor(($i / $files.Count) * 100))% Complete. (File: $i/$($files.Count))" -Id 1 -PercentComplete (($i / $files.Count) * 100)

		convertImgs $file
	}
}