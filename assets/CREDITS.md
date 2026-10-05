# 그림과 음악

- `village-atlas.webp`: 이 게임용으로 OpenAI의 내장 이미지 생성 도구로 제작한 그림의 웹용 파일입니다. 3×3 시트: 탐정, 어민, 할머니, 의료진, 학생, 도로 관리 직원, 버려진 병, 버스, 마을 집. CSS로 각 칸을 표시합니다. 원본 PNG는 별도 보관합니다.
- `peaceful-village.ogg`: Bobjt, **peacefull ville**, 2023 버전의 약 30초 전체 곡을 웹용 Opus 형식으로 변환한 파일입니다. 원본 배포 페이지: https://opengameart.org/content/peacefull-ville
- 음악 원본 파일: https://opengameart.org/sites/default/files/peaceful_ville_2023_0.mp3
- 음악 라이선스: **CC0**. 원본 페이지는 크레딧 의무가 없다고 명시하지만 게임에서 제작자를 표시합니다.
- 음악은 사용자가 ‘음악 켜기’를 누를 때 시작하고 낮은 음량으로 반복됩니다. 끌 수 있으며 다른 탭에서는 멈춥니다.

## 그림 제작 프롬프트

Use case: illustration-story. Original 3×3 equal-cell sprite atlas for a cozy Korean coastal village game for 9-year-olds. Pale cream background; cute hand-drawn 2D game art, navy outlines, coral and teal, friendly expressive faces. Top row: girl detective with magnifying glass, fisherman with straw hat, grandmother in lilac. Middle row: doctor with stethoscope, schoolboy with yellow backpack, maintenance worker with orange vest and helmet. Bottom row: discarded plastic bottle, mint village bus, orange-roof village house. No text, no logos, no existing game characters; every subject wholly within its own cell.

## v4 배경 이미지
- 제작: OpenAI 내장 image_gen 도구, 새 이미지 생성 (2026-10-05).
- 하나의 3열 × 2행 배경 atlas를 제작한 뒤 각 장면을 정확히 분리하고 웹 배포용 WebP로 저장했습니다. 장면마다 약 28~74 KB. 외부 이미지 링크 없이 포함됩니다.
- 파일: background-map.webp, background-sea.webp, background-bus.webp, background-clinic.webp, background-house.webp, background-road.webp.
- 고해상도 원본은 배포 폴더 밖 별도 결과물로 보존했습니다.
- 최종 생성 프롬프트:

Create a polished original children's cozy adventure game background atlas, EXACT 3 columns by 2 rows of six equal rectangular landscape panels, edge-to-edge no gutters. Each panel itself landscape 16:9. Soft hand painted Korean coastal village, navy outlines, mint turquoise sea, coral roofs, warm sunshine, charming illustrated game environment, no words, no UI, no characters. Top left: overhead island village map with coastal shore left, bus street, clinic center, houses right, road bottom, spacious. Top middle: beach cleanup scene with sand foreground and stream joining ocean. Top right: overhead town roads with school hospital market and park, ample open roads. Bottom left: cozy clinic reception interior with desk and seating, open foreground. Bottom middle: cozy old Korean coastal house garden and empty room frontage for restoration, open foreground. Bottom right: roadside water repair site with tools, pipes, walkway and school in distance. Consistent charming game art throughout. Flat clear composition supports overlay interactive objects. Large high resolution six-scene atlas.
